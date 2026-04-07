import './footer.css'

const Footer = () => {
  return (
    <footer className='w-full border-t border-gray-300'>
      <div className='flex justify-between items-center gap-2 sm:flex-col mt-16 pb-10'>
        <p className='text-sm font-inter text-gray-700'>
          © 2024 Open AI Article Summarizer. All rights reserved.
        </p>
        <div className='flex gap-2'>
          <a
            href='https://github.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm font-inter text-gray-500 hover:text-gray-700'
          >
            GitHub
          </a>
          <span className='text-sm text-gray-500'>•</span>
          <a
            href='https://twitter.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm font-inter text-gray-500 hover:text-gray-700'
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
