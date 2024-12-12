import React from 'react';
import { Database, Globe, Users, Briefcase, FileText, ShieldCheck } from 'lucide-react';

const Trend = () => {
  const sections = [
    {
      title: "提高实践的科学性和可靠性",
      items: [
        "数据驱动决策：EBPR强调使用高质量的研究证据指导决策，避免依赖个人经验或主观判断，从而提升实践的科学性。",
        "减少错误与偏差：通过系统性地评价和应用证据，可以减少决策中的不确定性和偏差，尤其在医疗、教育和社会科学等领域。",
      ],
      icon: <Database className="w-12 h-12 text-customBorder" />
    },
    {
      title: "满足社会对高质量服务的需求",
      items: [
        "提高效率和效果：现代社会对资源使用效率和服务效果的要求越来越高，EBPR可以通过优化资源配置，帮助实现最佳的实践结果。",
        "响应个性化需求：基于循证的决策能够结合具体情境和服务对象的需求，提供更加个性化和精准的解决方案。",
      ],
      icon: <Users className="w-12 h-12 text-customBorder" />
    },
    {
      title: "推动跨领域的协作和发展",
      items: [
        "跨学科应用：EBPR不仅应用于医疗领域，还被广泛用于教育、社会工作、心理学等，成为各行业的共同语言和工具。",
        "提升国际竞争力：许多国家和机构通过实施EBPR推动标准化，确保本国或本行业在国际上的竞争力。",
      ],
      icon: <Globe className="w-12 h-12 text-customBorder" />
    },
    {
      items: [
        "政策支持：许多国家的政府机构（如美国的AHRQ、英国的NICE）大力推动EBPR，制定相关标准和指南，要求各行业遵循。",
        "职业责任：在医疗和教育等领域，专业人员面临更高的法律和道德要求，EBPR为其提供合理、规范的依据，帮助规避风险。",
      ],
      icon: <ShieldCheck className="w-12 h-12 text-customBorder" />
    },
    {
      title: "技术进步的支持",
      items: [
        "大数据和AI技术的兴起：EBPR可以结合数据分析技术，将海量数据转化为实践依据，进一步推动循证实践的发展。",
        "快速信息获取：互联网和电子数据库的发展，让研究证据的获取变得更加便捷，促进了EBPR的普及。",
      ],
      icon: <FileText className="w-12 h-12 text-customBorder" />
    },
    {
      title: "应对全球性挑战",
      items: [
        "健康和社会问题：诸如老龄化、传染病、教育不平等等全球性问题需要基于科学证据的综合解决方案，EBPR为这些问题提供了重要支持。",
        "资源有限性：在资源有限的情况下，EBPR帮助决策者确保每项决策的高效和高效益。",
      ],
      icon: <Briefcase className="w-12 h-12 text-customBorder" />
    },
  ];

  return (
    <div className="py-8 px-4 mb-8 bg-customHover bg-opacity-10">

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sections.map((section, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md border p-10 flex items-center"
        >
          <div className="mr-8 flex-shrink-0 flex items-center justify-center">{section.icon}</div>
          <div>
            <ul className="text-gray-700">
              {section.items.map((item, i) => (
                <li key={i} className="mb-2">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Trend;
