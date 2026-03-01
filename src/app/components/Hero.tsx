import { GraduationCap, Building2 } from "lucide-react";

interface HeroProps {
  onRegisterTeacher: () => void;
  onRegisterCompany: () => void;
}

export function Hero({ onRegisterTeacher, onRegisterCompany }: HeroProps) {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1767840272002-7a4025ee0b33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGZvcmVzdCUyMGdyb3ZlJTIwbWluaW1hbHxlbnwxfHx8fDE3Njk4ODQ1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground leading-tight">
          Connecting universities and companies in one shared ecosystem
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Teachers publish courses. Companies discover opportunities. Collaboration begins.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onRegisterTeacher}
            className="group px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md hover:scale-[1.02] flex items-center gap-3 min-w-[240px] justify-center"
          >
            <GraduationCap className="w-5 h-5" />
            Register as Teacher
          </button>
          
          <button 
            onClick={onRegisterCompany}
            className="group px-8 py-4 bg-white text-foreground border-2 border-border rounded-lg hover:border-primary/40 hover:shadow-md hover:scale-[1.02] transition-all shadow-sm flex items-center gap-3 min-w-[240px] justify-center"
          >
            <Building2 className="w-5 h-5" />
            Register as Company
          </button>
        </div>
      </div>
    </section>
  );
}