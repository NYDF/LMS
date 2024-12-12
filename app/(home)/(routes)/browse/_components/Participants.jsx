import React from 'react'
import Image from 'next/image'

function Participants() {

  const sections = [
    {
      title: "心理健康与医疗领域",
      items: [
        "心理咨询师和心理医生：使用EBPR选择有效的心理治疗方法（如CBT、心理动力学疗法），改善患者心理健康。",
        "公共卫生从业者：设计和实施健康干预措施，基于证据改善公共健康问题（如疫情控制、慢性病管理等）。",
      ],
      image: "/psy.jpg"
    },
    {
      title: "社会工作领域",
      items: [
        "社会工作者：设计基于证据的社会干预计划，帮助不同人群解决社会心理问题（如儿童保护、家庭支持等）。",
        "特殊教育工作者：为有特殊需求的学生（如ADHD、自闭症）设计和实施有效的教学干预措施。",
      ],
      image: "/sw.jpg"
    },
    {
      title: "教育工作和学术研究",
      items: [
        "教师和教育管理者：基于循证研究选择有效的教学方法和教育策略，提升学生的学习效果。",
        "研究生和专业学位学生：如医学、心理学、教育学、公共管理等专业的学生，应掌握EBPR作为未来工作的核心技能。",
      ],
      image: "/teach.jpg"
    },
    {
      title: "政策制定和管理",
      items: [
        "政府官员和政策分析师：使用循证研究为政策制定提供依据，如公共卫生、教育、环境保护等领域的政策。",
        "非政府组织（NGO）管理者：基于证据设计和评估项目，优化资源分配和社会影响。",
      ],
      image: "/policy.jpg"
    },
  ];


  return (
    <div className="bg-customHover bg-opacity-10 py-8 px-4 mt-5 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-8">应该学习基于循证实践研究课程(EBPR)的群体</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
          >
            <Image src={section.image}
              alt='logo'
              width={240}
              height={180}
              priority={true}
              className='rounded-full object-cover mb-4'
            />
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            <ul className="text-gray-700">
              {section.items.map((item, i) => (
                <li key={i} className="mb-2">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants
