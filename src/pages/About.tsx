import { Code, Brain, Calculator, Rocket } from 'lucide-react';
import ResumePreview from '@/components/ResumePreview';

const About = () => {  const skills = [
    { icon: Code, title: 'Data Engineering', description: 'Experience with real-time data pipelines and system architecture' },
    { icon: Brain, title: 'Machine Learning', description: 'Experience with ML model development and implementation' },
    { icon: Calculator, title: 'Mathematics', description: 'Experience with advanced mathematical analysis and research' },
    { icon: Rocket, title: 'Competitive Programming', description: 'IOI Honorable Mention and National medals' }
  ];

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="section-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-math-purple bg-clip-text text-transparent">
            About Me
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">              <p className="text-xl text-muted-foreground leading-relaxed">
                I am a Developer and Mathematics student with extensive experience in data engineering, 
                machine learning, and applied research. My professional journey includes valuable internships 
                at Amazon and the National Science Foundation, where I focused on developing real-time data 
                pipelines, ML models, and innovative electric vehicle technologies.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                My achievements include an Honorable Mention at the 2023 International Olympiad in Informatics (IOI) 
                and two Bronze Medals at the National Olympiad in Informatics in Turkmenistan. Currently pursuing 
                a Mathematics major with a Computer Science minor at Baruch College, maintaining a 3.91 GPA, 
                I combine theoretical knowledge with practical applications to solve complex problems.
              </p>
                <ResumePreview />
            </div>              <div className="glass-effect rounded-3xl p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Core Values</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl">∞</span>
                    <span>Continuous learning and growth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-math-purple text-xl">∫</span>
                    <span>Integration of theory and practice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-math-blue text-xl">∑</span>
                    <span>Collaborative problem solving</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-math-gold text-xl">∆</span>
                    <span>Embracing change and innovation</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6 text-primary">Interests & Activities</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl">⚽</span>
                    <span>Soccer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-math-purple text-xl">🥋</span>
                    <span>Martial Arts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-math-blue text-xl">💻</span>
                    <span>
                      <a 
                        href="https://codeforces.com/profile/aga.mekan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline underline-offset-4"
                      >
                        Competitive Programming
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-math-gold text-xl">🎮</span>
                    <span>
                      <a 
                        href="https://steamcommunity.com/profiles/76561199239378422/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline underline-offset-4"
                      >
                        Competitive/Strategy Games
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-math-purple text-xl">🍸</span>
                    <span>Bartending</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div key={skill.title} className="project-card text-center group">
                <skill.icon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:text-accent transition-colors" />
                <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-muted-foreground text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
