import { CheckCircle2, CircleX } from 'lucide-react';
import { useState } from "react";

export const TestTake = ({ course }) => {

  return (
    <div className="p-5 border rounded-lg mt-5 justify-between">
      <h2 className="text-xl font-bold mb-4 text-center">{course.name} - 测试</h2>

      {course.exam && course.exam.length > 0 ? (
        course.exam.map((examItem, index) => (
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
                    name={`question-${examItem.id}`} // Corrected name attribute
                    value={choiceItem.id}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span>{choiceItem.choiceText}</span>
                </label>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No exam questions available.</p>
      )}
    </div>
  );
};
