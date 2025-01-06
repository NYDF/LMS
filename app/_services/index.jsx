import request, { gql } from "graphql-request"

const MASTER_URL = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


export const getCourseList = async () => {
  const query = gql`
  query courseList {
    courseLists {
      name
      catalog
      chapter {
        ... on Chapter {
          id
          name
          allParts {
            ... on Part {
              id
              name
            }
          }
        }
      }
      banner {
        url
      }
      description
      author
      free
      id
      tag
      sourceCode
      totalChapters
      price
    }
  }
    `
  const result = await request(MASTER_URL, query);
  return result;
}


export const getCourseById = async (id, userEmail) => {
  const query = gql`
    query course {
      courseList(where: {id: "` + id + `"}) {
        free
        description
        catalog
        name
        totalChapters
        banner {
          url
        }
        video {
          url
        }
        chapter (first: 20) {
          ... on Chapter {
            id
            name
            allParts (first: 20) {
              ... on Part {
                id
                name
                content {
                   raw
                }
              }
            }
          }
        }
        id
        author
        exam (first: 20) {
          ... on Exam {
            id
            choice {
              ... on Choice {
                id
                choiceText
                isCorrect
                choiceNumber
              }
            }
            type
            questionText
            correctAnswerNumber
          }
        }
        price
      }

        userEnrollCourses(where: {courseId: "` + id + `", userEmail: "` + userEmail + `"}) {
          courseId
          userEmail
          examResult
          id
          completedChapter (first: 100) {
            ... on CompletedChapter {
              id
              chapterId
              partId
          }
        }
      }
    }
  `
  const result = await request(MASTER_URL, query);

  return result;
}


export const EnrollCourse = async (courseId, userEmail) => {
  const mutationQuery = gql`
    mutation MyMutation {
      createUserEnrollCourse(
        data: {
                courseList:{
                  connect: {id: "`+ courseId + `"}
                }
                userEmail: "`+ userEmail + `",
                courseId: "` + courseId + `"
        }
      ) {
        id
        }
    }
  `
  const result = await request(MASTER_URL, mutationQuery);
  return result;
}


export const PublishCourse = async (id) => {
  const mutationQuery = gql`
    mutation EnrollCourse {
      publishUserEnrollCourse(where: {id: "`+ id + `"})
      {
        id
      }
    }
  `

  const result = await request(MASTER_URL, mutationQuery);
  return result;
}


export const markPartCompleted = async (courseRecordId, chapterId, partId) => {
  const mutationQuery = gql`
    mutation MarkPartCompleted {
      updateUserEnrollCourse(
        data: {
          completedChapter: {
            create: {
              CompletedChapter: {
                data: {
                  chapterId: "`+ chapterId + `",
                  partId: "`+ partId + `"
                }
              }
            }
          }
        }
        where: {id: "`+ courseRecordId + `"}
      ) {
        id
      }

      publishManyUserEnrollCoursesConnection(to: PUBLISHED) {
        edges {
          node {
            id
          }
        }
      }
    }
  `
  const result = await request(MASTER_URL, mutationQuery);
  return result;
}



export const GetUserCourseList = async (userEmail) => {
  const query = gql`
    query EnrollCourse {
      userEnrollCourses(where: {userEmail: "`+ userEmail + `"}) {
        courseList {
          author
          banner {
            url
          }
          catalog
          description
          free
          id
          name
          tag
          totalChapters
          price
        }
      }
    }
  `
  const result = await request(MASTER_URL, query);
  return result;

}


export const submitTestRes = async (courseRecordId, answersToTest) => {
  const mutationQuery = gql`
    mutation submitTestRes($id: ID!, $examResult: Json!) {
      updateUserEnrollCourse(
        data: { examResult: $examResult }
        where: { id: $id }
      ) {
        id
        examResult
      }

      publishManyUserEnrollCoursesConnection(to: PUBLISHED) {
        edges {
          node {
            id
          }
        }
      }

    }
  `;

  const variables = {
    id: courseRecordId,
    examResult: answersToTest, // Pass the answers directly as JSON
  };

  const result = await request(MASTER_URL, mutationQuery, variables);
  return result;
};
