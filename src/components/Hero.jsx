import './hero.css'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <h1 className='head_text'>
          Summarize any article with <br className='max-md:hidden' />
          <span className='orange_gradient'>OpenAI GPT-4</span>
        </h1>
      </nav>
      <h2 className='desc'>
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  )
}

export default Hero
