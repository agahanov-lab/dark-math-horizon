import { ArrowRight, Code, Brain, Calculator, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <div className="hero-gradient min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-6 text-center">
          <div className="section-fade-in">
            <div className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8">
              <TypeAnimation
                sequence={[
                  'Hi, I\'m Mekan.',
                  1000,
                  'Hi, I\'m a Developer.',
                  1000,
                  'Hi, I\'m a Learner.',
                  1000,
                ]}
                wrapper="h1"
                speed={{ type: 'keyStrokeDelayInMs', value: 100 }}
                className="bg-gradient-to-r from-primary via-accent to-math-purple bg-clip-text text-transparent"
                repeat={Infinity}
              />
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Where mathematics meets code, and algorithms dance with elegance. 
              Exploring the infinite possibilities at the intersection of logic and creativity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <Link 
                to="/projects" 
                className="group flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/80 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="font-semibold">View Projects</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              
              <Link 
                to="/about" 
                className="group px-8 py-4 glass-effect hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="font-semibold">About Me</span>
              </Link>
            </div>

            <div className="flex justify-center gap-6 mb-16">              <a
                href="https://www.linkedin.com/in/mekan-agahanov/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-effect rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6 text-primary hover:text-accent" />
              </a>
              <a
                href="https://github.com/agahanov-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-effect rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-6 h-6 text-primary hover:text-accent" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link to="/projects" className="project-card group text-center">
            <Code className="w-16 h-16 mx-auto mb-6 text-primary group-hover:text-accent transition-colors" />
            <h3 className="text-2xl font-semibold mb-4">Projects</h3>
            <p className="text-muted-foreground">
              Innovative solutions combining cutting-edge technology with mathematical precision
            </p>
          </Link>
          
          <Link to="/mathematics" className="project-card group text-center">
            <Calculator className="w-16 h-16 mx-auto mb-6 text-math-purple group-hover:text-accent transition-colors" />
            <h3 className="text-2xl font-semibold mb-4">Mathematics</h3>
            <p className="text-muted-foreground">
              Exploring the elegant beauty of mathematical concepts and their real-world applications
            </p>
          </Link>
          
          <Link to="/algorithms" className="project-card group text-center">
            <Brain className="w-16 h-16 mx-auto mb-6 text-accent group-hover:text-primary transition-colors" />
            <h3 className="text-2xl font-semibold mb-4">Algorithms</h3>
            <p className="text-muted-foreground">
              The art and science of computational problem-solving through efficient algorithms
            </p>
          </Link>
        </div>
      </div>

      {/* Quote Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect rounded-3xl p-12">
            <div className="text-6xl text-accent mb-6 font-mono">"</div>
            <blockquote className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
              Mathematics is the language with which God has written the universe
            </blockquote>
            <cite className="text-lg text-muted-foreground">— Galileo Galilei</cite>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
