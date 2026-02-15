import { ThemeProvider } from "./ThemeProvider";
import Navbar from "./Navbar";
import ThemeContext from "./ThemeContent";


export default function ContextPage() {
  return (
    <ThemeProvider>
        <div className = 'flex flex-col items-center justify-center min-h-screen'>
      <Navbar />
      <main className='flex-1 w-full'>
      <ThemeContext />
      </main>
      </div>
    </ThemeProvider>
  );
}