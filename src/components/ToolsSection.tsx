import React from 'react';
import { siteContent } from '@/data/content';
import { IconFolder, FolderIcon } from '@/components/ui/icon-folder';
import { Globe } from 'lucide-react';

interface CategoryFolderConfig {
  id: string;
  title: string;
  icons: FolderIcon[];
}

const STACK_FOLDERS: CategoryFolderConfig[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icons: [
      { label: 'React', src: '/assets/logos/react.svg' },
      { label: 'TypeScript', src: '/assets/logos/typescript.svg' },
      { label: 'JavaScript', src: '/assets/logos/javascript.svg' },
      { label: 'HTML5', src: '/assets/logos/html5.svg' },
      { label: 'CSS3', src: '/assets/logos/css3.svg' },
    ],
  },
  {
    id: 'automation-ai',
    title: 'Automation & AI',
    icons: [
      { label: 'n8n', src: '/assets/logos/n8n.svg' },
      { label: 'Ollama', src: '/assets/logos/ollama.svg' },
      { label: 'Claude', src: '/assets/logos/claude.svg' },
      { label: 'OpenAI', src: '/assets/logos/openai.svg' },
      { label: 'LangChain', src: '/assets/logos/langchain.svg' },
      { label: 'Hugging Face', src: '/assets/logos/huggingface.svg' },
    ],
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    icons: [
      { label: 'Python', src: '/assets/logos/python.svg' },
      { label: 'PyTorch', src: '/assets/logos/pytorch.svg' },
      { label: 'TensorFlow', src: '/assets/logos/tensorflow.svg' },
      { label: 'Scikit-Learn', src: '/assets/logos/scikitlearn.svg' },
      { label: 'Keras', src: '/assets/logos/keras.svg' },
      { label: 'OpenCV', src: '/assets/logos/opencv.svg' },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science',
    icons: [
      { label: 'Pandas', src: '/assets/logos/pandas.svg' },
      { label: 'NumPy', src: '/assets/logos/numpy.svg' },
      { label: 'Plotly', src: '/assets/logos/plotly.svg' },
      { label: 'Jupyter', src: '/assets/logos/jupyter.svg' },
      { label: 'Kaggle', src: '/assets/logos/kaggle.svg' },
    ],
  },
  {
    id: 'design-workflow',
    title: 'Design & Workflow',
    icons: [
      { label: 'Figma', src: '/assets/logos/figma.svg' },
      { label: 'Git', src: '/assets/logos/git.svg' },
      { label: 'GitHub', src: '/assets/logos/github.svg' },
      { label: 'Vercel', src: '/assets/logos/vercel.svg' },
      { label: 'Google Cloud', src: '/assets/logos/google.svg' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    icons: [
      { label: 'Node.js', src: '/assets/logos/nodejs.svg' },
      { label: 'Express.js', src: '/assets/logos/express.svg' },
      { label: 'FastAPI', src: '/assets/logos/fastapi.svg' },
      { label: 'Python', src: '/assets/logos/python.svg' },
    ],
  },
];

export const ToolsSection: React.FC = () => {
  const { stack, languages } = siteContent;

  const totalToolsCount = STACK_FOLDERS.reduce((acc, folder) => acc + folder.icons.length, 0);

  return (
    <section id="stack" className="scroll-mt-24 py-16 sm:py-20 lg:py-28">
      {/* Header aligned with other sections */}
      <div className="mb-10 sm:mb-12 lg:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="section-heading text-[#111111]">
            {stack.heading}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-zinc-600 font-normal leading-relaxed max-w-prose">
            Technologies and tools grouped into interactive category folders. Tap or hover over any folder to expand and inspect each tool.
          </p>
        </div>
        <span className="self-start sm:self-auto shrink-0 font-mono text-[10px] font-medium px-3 py-1 rounded-full bg-white text-[#111111] border border-[#E7E5E0] shadow-2xs select-none">
          {totalToolsCount} TECHNOLOGIES
        </span>
      </div>

      {/* Grid: 1 col on mobile (centered, 24px gap), 2 cols on md, 3 cols on lg */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
        {STACK_FOLDERS.map((folder) => (
          <div key={folder.id} className="w-full flex justify-center">
            <IconFolder
              title={folder.title}
              icons={folder.icons}
              theme="light"
              showPill={true}
              spread={folder.icons.length > 4 ? 46 : 64}
              defaultOpen={true}
            />
          </div>
        ))}
      </div>


      {/* Languages Subsection */}
      {languages && languages.items && languages.items.length > 0 && (
        <div className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-[var(--border)] w-full">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#111111]" />
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#111111] select-none">
                {languages.heading || 'Languages'}
              </h3>
            </div>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider select-none">
              {languages.items.length} Languages
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {languages.items.map((item) => (
              <div
                key={item.language}
                className="p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-white shadow-2xs flex items-center justify-between group hover:border-[#2F4BFF] transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm sm:text-base text-[#111111]">
                      {item.language}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]">
                      {item.language === 'English' ? 'EN' : '日本語 · JA'}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="shrink-0 ml-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium select-none ${
                      item.level.toLowerCase().includes('advanced')
                        ? 'bg-[#111111] text-white'
                        : 'bg-[var(--surface)] text-[#111111] border border-[var(--border)]'
                    }`}
                  >
                    {item.level.toLowerCase().includes('n3') ? 'JLPT N3' : item.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ToolsSection;
