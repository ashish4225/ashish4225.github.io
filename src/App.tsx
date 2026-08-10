import { useRouter } from '@/router';
import BackgroundLayer from '@/components/BackgroundLayer';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BlogPage from '@/components/BlogPage';
import BlogPostPage from '@/components/BlogPostPage';

function App() {
  const route = useRouter();

  return (
    <div className="relative min-h-screen">
      <BackgroundLayer />
      <Navbar route={route} />

      {route.name === 'home' && (
        <main className="page-fade">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </main>
      )}

      {route.name === 'blog' && (
        <main className="page-fade">
          <BlogPage />
          <Footer />
        </main>
      )}

      {route.name === 'post' && (
        <main className="page-fade">
          <BlogPostPage slug={route.slug} />
          <Footer />
        </main>
      )}
    </div>
  );
}

export default App;
