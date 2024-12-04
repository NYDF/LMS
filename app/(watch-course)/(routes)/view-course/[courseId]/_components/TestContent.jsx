import { CheckCircle2, CircleX } from 'lucide-react';
import { useState } from "react";
import { TestResult } from './TestResult';
import { TestTake } from './TestTake';

export const TestContent = ({ userCourse, course, params }) => {
  console.log("testcontent~~~~~~~~userCourse", userCourse);
  console.log("testcontent~~~~~~~~course", course);

  const hasCompletedExam = userCourse?.examResult && userCourse.examResult.length === course.exam?.length;


  if (!hasCompletedExam) {
    // Render the exam-taking interface
    return (
      <TestTake
        course={course}
        userCourse={userCourse}
        params={params}
      />
    );
  }

  
  // Render exam result page when the user has completed the exam
  return (
    <TestResult
      course={course}
      userCourse={userCourse}
      params={params}
    />
  );
};
