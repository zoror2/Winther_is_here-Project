import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SnowEffect from '@/components/SnowEffect';
import { Snowflake } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Firebase Auth integration
    // For now, just navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <SnowEffect />
      
      <div className="w-full max-w-md relative z-10 animate-slide-up">
        <div className="frost-card p-8 space-y-6 glow-ice">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <Snowflake className="w-16 h-16 text-primary animate-float glow-ice" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Welcome to the
            </h1>
            <h2 className="text-4xl font-heading font-bold text-primary">
              Winter Arc ❄️
            </h2>
            <p className="text-muted-foreground">
              Track your goals. Compete. Conquer.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input border-primary/30 focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-input border-primary/30 focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold text-lg glow-ice transition-all duration-300 hover:scale-105"
            >
              Enter the Winter Arc
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Firebase Auth integration ready for connection
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
