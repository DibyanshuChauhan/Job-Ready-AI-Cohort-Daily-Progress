const LOADING = () => {
    return (
        <main className="feed-page">
            <div className="feed">
                {[1, 2, 3].map((item) => (
                    <div className="post skeleton-post" key={item}>
                        <div className="user">
                            <div className="skeleton skeleton-avatar"></div>

                            <div className="skeleton-user-info">
                                <div className="skeleton skeleton-text short"></div>
                            </div>
                        </div>

                        <div className="skeleton skeleton-image"></div>

                        <div className="post-actions">
                            <div className="left-actions">
                                <div className="skeleton skeleton-icon"></div>
                                <div className="skeleton skeleton-icon"></div>
                                <div className="skeleton skeleton-icon"></div>
                            </div>

                            <div className="skeleton skeleton-icon"></div>
                        </div>

                        <div className="bottom">
                            <div className="skeleton skeleton-caption"></div>
                            <div className="skeleton skeleton-caption small"></div>
                        </div>
                    </div>
                ))}
            </div>
        </main> 
    )
}

export default LOADING