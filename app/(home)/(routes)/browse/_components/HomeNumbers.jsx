import React from 'react';
import Image from 'next/image'

const HomeNumbers = () => {

  const stats = [
    {
      number: "170亿",
      description: "EBP能够帮助机构将有限的资源用在科学证明有效的策略上，减少浪费。美国医疗保健系统的研究表明，采用基于证据的干预措施每年可节省约170亿美元的医疗开支。"
    },
    {
      number: "70%",
      description: "提高干预措施的效果和客户的成功率，EBP通过科学验证的疗法（如认知行为疗法、正念疗法）为客户提供更加有效的心理干预。一项对抑郁症患者的研究发现，基于证据的认知行为疗法（CBT）在8-12周内能显著改善70%的患者症状，而传统谈话疗法仅改善约40%的患者。"
    },
    {
      number: "8-12",
      description: "缩短治疗时间，减少资源浪费基于证据的治疗方法（如曝光疗法）能够显著缩短治疗所需的时间。在PTSD治疗中，使用EBP的治疗时间平均为8-12周，而传统治疗方式需要16-20周才能达到相似效果。"
    }
  ];

  return (
    <div>
      <div className="py-4 px-2 mb-4 sm:py-6 sm:px-3 md:py-6 md:px-4">

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`px-8 sm:px-12 md:px-14 lg:px-16 text-center ${index < stats.length - 1 ? 'md:border-r-2 border-gray-300 pb-4 md:pb-6' : ''}`}
            >
              <div className="text-4xl md:text-5xl font-bold text-customBorder mb-6 md:mb-6">{stat.number}</div>
              <p className="text-gray-700 text-sm md:text-base">{stat.description}</p>
            </div>
          ))}
        </div>

      </div>

      <div className='rounded-lg'>
        <Image
          src='/familysunset.jpg'
          alt='familysunset'
          className='rounded-lg'
          layout='responsive'
          width={1920}
          height={320}
          priority={true}
        />

      </div>
    </div>
  );
};

export default HomeNumbers;
