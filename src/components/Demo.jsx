import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUrl, setSummary, setLoading, setError } from '../features/articleSlice'
import { summarizeArticle } from '../services/api'
import './demo.css'

const Demo = () => {
  const dispatch = useDispatch()
  const { url, summary, loading, error } = useSelector((state) => state.article)
  const [articles, setArticles] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!url) {
      dispatch(setError('Please provide a URL'))
      return
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      dispatch(setError('Please enter a valid URL'))
      return
    }

    dispatch(setLoading(true))
    dispatch(setError(''))
    
    try {
      const summaryText = await summarizeArticle(url)
      dispatch(setSummary(summaryText))
      setArticles([{ url, summary: summaryText }, ...articles])
    } catch (err) {
      dispatch(setError('Error summarizing article. Please try another URL.'))
      dispatch(setSummary(''))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
          <img
            src='/link.svg'
            alt='link-icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />

          <input
            className='url_input peer'
            placeholder='Paste the article link here'
            value={url}
            onChange={(e) => dispatch(setUrl(e.target.value))}
          />
          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
          >
            {loading ? '⏳' : '↗'}
          </button>
        </form>

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {articles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => dispatch(setSummary(item.summary))}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img src='/copy.svg' alt='copy_icon' width={12} height={12} />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {summary && (
        <div className='my-10 max-w-full flex justify-center items-center'>
          <div className='summary_box'>
            <div className='mb-4'>
              <p className='text-sm text-gray-500 mb-2'>Article URL:</p>
              <p className='font-satoshi font-medium text-gray-800 break-all text-sm'>{url}</p>
            </div>
            <hr className='my-4 border-gray-300' />
            <p className='font-inter font-light text-gray-700 leading-relaxed'>
              <span className='font-bold font-satoshi text-gray-900'>Summary: </span>
              {summary}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Demo
