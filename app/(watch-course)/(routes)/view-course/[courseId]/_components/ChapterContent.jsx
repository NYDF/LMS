import React, { useContext } from 'react'
import { CheckCircle2, CircleChevronRight } from 'lucide-react';
import { CompletedChapterContext } from '../../../../../_context/CompletedChapterContext';
import { markPartCompleted } from '../../../../../_services';

export const ChapterContent = ({ userCourse, activePart, params }) => {

  const { completedChapter, setCompletedChapter } = useContext(CompletedChapterContext)

  const chapterId = params.chapterId

  // console.log('ChapterContent++++++completedChapter', completedChapter)
  // console.log('ChapterContent------activePart', activePart?.content)

  const isPartCompleted = (chapterId, partId) => {
    return completedChapter.some(item => item.chapterId === chapterId && item.partId === partId);
  };


  const _markPartCompleted = async () => {
    if (!completedChapter?.length) {
      setCompletedChapter([]);
    }

    completedChapter ? setCompletedChapter(
      [...completedChapter,
      {
        chapterId: chapterId,
        partId: activePart?.id
      }
      ]
    ) : setCompletedChapter([{
      chapterId: activeChapter?.chapterNumber + ""
    }]);

    await markPartCompleted(userCourse.id, chapterId, activePart?.id)
  }


  return activePart && (
    <div className='p-5'>


      <div className='p-5 border rounded-lg mt-5 justify-between'>
        <h2 className='text-4xl pb-5 mb-5 font-bold text-center border-b-2'>{activePart.name}</h2>


        <div>
          {activePart?.content.raw.children.map((child, index) => {
            if (child.type === "heading-one") {
              return (
                <h1 key={index} className="text-2xl font-bold text-center my-5">
                  {child.children.map((textNode, i) => textNode.text || "")}
                </h1>
              );
            } else if (child.type === "image") {
              return (
                <div key={index} className="my-5 flex justify-center">
                  <img
                    src={child.src}
                    alt={child.title || "Image"}
                    width={child.width}
                    height={child.height}
                    className="max-w-full h-auto"
                  />
                </div>
              );
            } else if (child.type === "video") {
              return (
                <div key={index} className="my-5 flex justify-center">
                  <video
                    controls
                    className="max-w-full"
                    width={child.width || "auto"}
                    height={child.height || "auto"}
                  >
                    <source src={child.src} type={child.mimeType} />
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                </div>
              );
            } else if (child.type === "bulleted-list") {
              return (
                <ul key={index} className="list-disc pl-5 my-2">
                  {child.children.map((listItem, i) => (
                    <li key={i} className="my-1">
                      {listItem.children.map((listItemChild, j) =>
                        listItemChild.children.map((textNode, k) => textNode.text || "")
                      )}
                    </li>
                  ))}
                </ul>
              );
            } else {
              return (
                <p key={index} className="text-base my-2">
                  {child.children.map((textNode, i) => textNode.text || "")}
                </p>
              );
            }
          })}
        </div>


        <div className="flex justify-center mt-6 mb-2">
          {!isPartCompleted(chapterId, activePart.id) ?
            <button className='bg-purple-500 text-white
                p-2 px-5 rounded-lg flex gap-2
                hover:bg-purple-800'
              onClick={() => _markPartCompleted()}>
              <CircleChevronRight /> <h2>确认完成本章节</h2>
            </button>
            :
            <button className='bg-green-500 text-white
                p-2 px-5 rounded-lg flex gap-2
                cursor-not-allowed disabled'>
              <CheckCircle2 /> <h2>本章节已经完成</h2>
            </button>
          }
        </div>

      </div>
    </div>
  )
}
