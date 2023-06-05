const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (blogWithMostLikes, blog) => {
    return blog.likes > blogWithMostLikes.likes ? blog : blogWithMostLikes
  }

  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const blogsGroupedByAuthor = lodash.groupBy(blogs, 'author')
  const authorWithMostBlogs = lodash.maxBy(Object.keys(blogsGroupedByAuthor), author => blogsGroupedByAuthor[author].length)
  const mostBlogsCount = blogsGroupedByAuthor[authorWithMostBlogs].length

  return {
    'author': authorWithMostBlogs,
    'blogs': mostBlogsCount,
  }
}

const mostLikes = (blogs) => {
  return lodash.chain(blogs)
    .groupBy('author')
    .map((blogs, author) => ({ author, likes: lodash.sumBy(blogs, 'likes') }))
    .maxBy('likes')
    .value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}