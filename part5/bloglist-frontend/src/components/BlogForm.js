const BlogForm = () => {

    return (
        <div>
            <form onSubmit={addBlog}>
                <input
                    value={newBlog}
                    onChange={handleBlogChange}
                />
                <button type="submit">save</button>
            </form>  
        </div>
    )
}

export default BlogForm