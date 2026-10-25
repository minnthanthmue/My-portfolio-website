import React from 'react';
import { siteContent } from '@/data/content';
import OrbitTimeline, { OrbitTimelineYear } from '@/components/ui/orbit-timeline';
import CertificateCarousel from '@/components/ui/certificate-carousel';
import { Award, GraduationCap, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { education } = siteContent;

  const educationOrbitData: OrbitTimelineYear[] = [
    {
      year: 2023,
      events: [
        {
          icon: <GraduationCap />,
          title: 'Finished GED in 2023',
          description:
            'Completed high school equivalency diploma (GED), establishing the academic foundation to pursue university degree studies.',
        },
      ],
    },
    {
      year: 2024,
      events: [
        {
          date: 'Spring',
          icon: <BookOpen />,
          title: 'Enrolled at Tokyo International University in 2024',
          description:
            'Undergraduate student in Digital Business & Innovation (DBI) in Tokyo, Japan. Bridging technical software development with strategic product sense and AI pipelines.',
        },
      ],
    },
    {
      year: 2028,
      events: [
        {
          date: 'Expected',
          icon: <Award />,
          title: 'Expected graduation year: 2028',
          description:
            'Expected completion of Bachelor of Science in Digital Business & Innovation, prepared to build production web platforms, AI pipelines, and data systems.',
        },
      ],
    },
  ];

  const certificatesCount = education.certificates?.length || 0;

  return (
    <section id="education" className="scroll-mt-24 py-16 sm:py-20 lg:py-28" aria-label="Education">
      {/* Section Header */}
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <h2 className="section-heading text-[#111111]">
          {education.heading}
        </h2>
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-zinc-600 font-normal leading-relaxed max-w-prose">
          Academic timeline, university milestones, and verified credentials at Tokyo International University.
        </p>
      </div>

      {/* Orbit Timeline Container (Light Mode) */}
      <div className="w-full h-[560px] md:h-[640px] lg:h-[700px] rounded-3xl overflow-hidden border border-[#E7E5E0] bg-[#FAFAF8] relative shadow-2xs">
        <OrbitTimeline
          data={educationOrbitData}
          theme="light"
          showYears={true}
          speed={1}
          direction="alternate"
          intro={true}
          yearFont="var(--font-mono, 'JetBrains Mono', monospace)"
          className="w-full h-full"
        />
      </div>

      {/* Certifications: Clean & Minimal Certificate Carousel */}
      {education.certificates && certificatesCount > 0 && (
        <div id="certificates" className="scroll-mt-28 w-full mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[var(--border)] space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#111111]" />
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#111111] select-none">
                Certifications &amp; Credentials
              </h3>
            </div>
            <span className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-white text-[#111111] border border-[#E7E5E0] shadow-2xs select-none">
              {certificatesCount} VERIFIED
            </span>
          </div>

          <div className="w-full py-1 sm:py-2">
            <CertificateCarousel
              certificates={education.certificates.map((cert) => ({
                id: cert.id,
                title: cert.title,
                issuer: cert.issuer,
                issuerLogo: cert.issuerLogo || cert.logo,
                date: cert.issueDate || cert.date || 'Jun 20, 2026',
                image: cert.image,
                alt: `${cert.title} awarded to Minn Thant Hmue by ${cert.issuer}`,
                credentialUrl: cert.credentialUrl || cert.url,
                description: cert.description,
              }))}
              autoplay={false}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default EducationSection;
