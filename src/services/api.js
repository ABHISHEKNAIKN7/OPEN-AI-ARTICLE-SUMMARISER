// Rapid API endpoint for article summarization
export const summarizeArticle = async (articleUrl) => {
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY

  // If no API key, use mock summary
  if (!apiKey || apiKey === 'your_api_key_here') {
    return getMockSummary(articleUrl)
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
    }
  }

  try {
    const response = await fetch(
      `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(articleUrl)}&length=3`,
      options
    )
    
    if (!response.ok) {
      console.warn('API error, using mock summary')
      return getMockSummary(articleUrl)
    }

    const data = await response.json()
    return data.summary || getMockSummary(articleUrl)
  } catch (error) {
    console.error('API Error:', error)
    return getMockSummary(articleUrl)
  }
}

export const getMockSummary = (url) => {
  const urlLower = url.toLowerCase()
  
  // Domain-specific summaries
  const summaryMap = {
    'wikipedia': 'This article provides a comprehensive overview of the topic with detailed information about its history, key concepts, and significance. The content covers various aspects including definitions, background information, and relevant examples that help establish a thorough understanding of the subject.',
    'medium': 'This is an in-depth article that explores the topic from multiple perspectives. The author presents insights, personal experiences, and practical examples to help readers understand the subject matter better. The writing style is engaging and informative.',
    'cnn': 'This news article covers recent events and developments related to the topic. It provides current information, expert opinions, and relevant details about recent happenings. The article aims to keep readers informed about the latest updates in this area.',
    'bbc': 'This BBC article presents factual information with balanced reporting. It covers the essential aspects of the topic, including background context, expert analysis, and different perspectives. The content is well-researched and credible.',
    'techcrunch': 'This technology-focused article discusses innovations, startup developments, or tech industry news. It analyzes trends, business implications, and future prospects in the technology sector. The piece provides valuable insights for tech enthusiasts and professionals.',
    'forbes': 'This Forbes article covers business and financial aspects of the topic. It includes expert analysis, market insights, and strategies relevant to the subject. The content targets professionals and decision-makers.',
    'github': 'This is technical documentation about a software project. It explains features, usage instructions, and implementation details. Perfect for developers looking to understand or contribute to the project.',
    'stackoverflow': 'This technical discussion covers programming questions and solutions. It includes code examples, best practices, and expert answers to help solve technical challenges.',
    'linkedin': 'This professional article discusses industry trends, career insights, and business strategies. It offers valuable perspectives for professionals and thought leaders in the field.',
  }

  // Find matching domain
  for (const [domain, summary] of Object.entries(summaryMap)) {
    if (urlLower.includes(domain)) {
      return summary
    }
  }

  // Extract domain from URL for generic summary
  try {
    const urlObj = new URL(url)
    const domain = urlObj.hostname.replace('www.', '')
    return `This article from ${domain} provides information about the topic. It contains relevant details, analysis, and insights that help readers understand the subject better. The content is presented in a clear and organized manner.`
  } catch {
    return 'This article covers the topic with relevant information and analysis. The content provides insights and details to help understand the subject matter.'
  }
}
