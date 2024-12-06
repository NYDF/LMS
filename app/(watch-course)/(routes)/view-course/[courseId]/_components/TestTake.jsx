import { useState, useEffect } from "react";
import { submitTestRes } from "@/app/_services";


export const TestTake = ({ course, userCourse }) => {


  const [answers, setAnswers] = useState(
    Array(course.exam?.length).fill(null) // Initialize with null to represent unanswered questions
  );

  useEffect(() => {
    // Check if answers are loaded and update the state appropriately
    if (course.exam) {
      setAnswers(Array(course.exam.length).fill(null)); // Reset answers on load
    }
  }, [course.exam]);

  const allQuestionsAnswered = answers.every((answer) => answer !== null);
  console.log('TestTake========answers', answers)

  const handleAnswerChange = (questionIndex, choiceId) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = parseInt(choiceId, 10); // Convert choiceId to an integer
      return updatedAnswers;
    });
  };

  const handleSubmit = async () => {
    // Validate that all answers are non-null
    if (!allQuestionsAnswered) {
      alert("你需要完成所有问题方可提交答案");
      return;
    }

    // Create an object mapping each question ID to the user's choice
    const submission = course.exam.map((examItem, index) => ({
      id: examItem.id,
      answer: answers[index],
    }));

    try {
      const result = await submitTestRes(userCourse.id, submission);

      alert("你已成功完成测试，请查看成绩！");
      window.location.reload();

    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit your answers. Please try again.");
    }
  };

  return (
    <div className="p-5 border rounded-lg mt-5 justify-between">
      <h2 className="text-xl font-bold mb-4 text-center">{course.name} - 测试</h2>

      {course.exam && course.exam.length > 0 ? (
        <>
          {course.exam.map((examItem, index) => (
            <div key={examItem.id} className="mb-6">
              <h3 className="font-semibold text-lg">
                {index + 1}. {examItem.questionText}
              </h3>
              <div className="mt-3 space-y-2">
                {examItem.choice.map((choiceItem) => (
                  <label
                    key={choiceItem.id}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={choiceItem.choiceNumber} // Use choiceNumber as the value
                      className="form-radio h-5 w-5 text-blue-600"
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value) // Update answer on selection
                      }
                    />
                    <span>{choiceItem.choiceText}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            style={{
              cursor: allQuestionsAnswered ? "pointer" : "not-allowed",
              backgroundColor: allQuestionsAnswered ? "#4CAF50" : "#d3d3d3",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
            }}
          >
            提交答案
          </button>
        </>
      ) : (
        <p className="text-gray-500">No exam questions available.</p>
      )}
    </div>
  );
};
