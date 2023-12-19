const listHelper = require('../utils/list_helper')

describe('Listhelper', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('array of zero', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('array of one blog', () => {
    const blogs = [
      {
        title: 'Testblog32',
        author: 'Joseph Cassidy',
        url: 'test url',
        likes: 43,
        _id: '6581d90f67816d1282af4a52',
        __v: 0,
      },
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(43)
  })

  test('array of two blogs', () => {
    const blogs = [
      {
        title: 'Testblog32',
        author: 'Joseph Cassidy',
        url: 'test url',
        likes: 43,
        _id: '6581d90f67816d1282af4a52',
        __v: 0,
      },
      {
        title: 'Testblog32',
        author: 'Joseph Cassidy',
        url: 'test url',
        likes: 43,
        _id: '6581d90f67816d1282af4a52',
        __v: 0,
      },
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(86)
  })
})

describe('Favorite blogs helper', () => {
  test('no blogs', () => {
    const blogs = []

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({})
  })

  test('one blog', () => {
    const blogs = [
      {
        title: 'Testblog32',
        author: 'Joseph Cassidy',
        url: 'test url',
        likes: 43,
        _id: '6581d90f67816d1282af4a52',
        __v: 0,
      },
    ]

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'Testblog32',
      author: 'Joseph Cassidy',
      likes: 43,
    })
  })

  test('two blogs, later the bigger', () => {
    const blogs = [
      {
        title: 'testblog 1',
        author: 'Joseph Cassidy',
        url: 'test url',
        likes: 0,
        _id: '6581d90f67816d1282af4a52',
        __v: 0,
      },
      {
        title: 'testblog 2',
        author: 'Joseph Cassidy',
        url: 'test url',
        likes: 43,
        _id: '6581d90f67816d1282af4a52',
        __v: 0,
      },
    ]

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'testblog 2',
      author: 'Joseph Cassidy',
      likes: 43,
    })
  })

  test('two blogs, erlier the bigger', () => {
    const blogs = [
      {
        title: 'testblog 1',
        author: 'Joseph Cassidy',
        url: 'test url',
        likes: 43,
        _id: '6581d90f67816d1282af4a52',
        __v: 0,
      },
      {
        title: 'testblog 2',
        author: 'Joseph Cassidy',
        url: 'test url',
        likes: 0,
        _id: '6581d90f67816d1282af4a52',
        __v: 0,
      },
    ]

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'testblog 1',
      author: 'Joseph Cassidy',
      likes: 43,
    })
  })
})
