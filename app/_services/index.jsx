import request, { gql } from "graphql-request"

// const MASTER_URL = process.env.local.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const MASTER_URL = "https://us-west-2.cdn.hygraph.com/content/cm35rq489009n07v1xeea103s/master"


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
              content {
                text
                json
                markdown
              }
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
    chapter {
      ... on Chapter {
        id
        name
        allParts {
          ... on Part {
            id
            name
            content {
               raw
               html
               markdown
               text
            }
          }
        }
      }
    }
    id
    author
  }
    userEnrollCourses(where: {courseId: "` + id + `", userEmail: "` + userEmail + `"}) {
      courseId
      userEmail
      id
      completedChapter {
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
        }
      }
    }
  `
  const result = await request(MASTER_URL, query);
  return result;

}
