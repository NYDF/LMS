import { CheckCircle2, CircleX } from 'lucide-react';

export const TestResult = ({ userCourse, course }) => {

  // Render exam result page when the user has completed the exam
  return (
    <div className="p-5 border rounded-lg mt-5 justify-between">
      <h2 className="text-xl font-bold mb-4 text-center">
        {course.name} - 测试结果
      </h2>

      {course.exam && course.exam.length > 0 ? (
        course.exam.map((examItem, index) => {
          const userAnswer = userCourse.examResult[index]; // Get the user's answer
          const correctAnswer = examItem.correctAnswerNumber; // Correct answer number
          const isCorrect = userAnswer === correctAnswer; // Check if the user's answer is correct

          return (
            <div key={examItem.id} className="mb-6">
              <h3 className="font-semibold text-lg">
                {index + 1}. {examItem.questionText}
              </h3>
              <div className="mt-3 space-y-2">
                {examItem.choice.map((choiceItem, choiceIndex) => {
                  const isCorrectChoice = choiceIndex + 1 === correctAnswer;
                  const isUserChoice = choiceIndex + 1 === userAnswer;

                  return (
                    <div
                      key={choiceIndex}
                      className={`flex items-center space-x-3 p-2 rounded ${isUserChoice
                        ? isCorrect
                          ? "bg-green-100"
                          : "bg-red-100"
                        : isCorrectChoice
                          ? "bg-green-100"
                          : ""
                        }`}>

                      <div className="w-6 flex justify-center items-center">
                        {isUserChoice ? (
                          isCorrect ? (
                            <CheckCircle2 className="text-green-500 h-5 w-5" />
                          ) : (
                            <CircleX className="text-red-500 h-5 w-5" />
                          )
                        ) : isCorrectChoice ? (
                          <CheckCircle2 className="text-green-500 h-5 w-5" />
                        ) : (
                          <span className="w-5" />
                        )}
                      </div>

                      <span className="font-bold text-gray-700">O</span>

                      <span>{choiceItem.choiceText}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500">No exam questions available.</p>
      )}
    </div>
  );
};
