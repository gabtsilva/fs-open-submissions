const Notification  = ({message, type}) => {
    const combinedClassNames = `${type} notification`;
    if (message === null) {
        return null
    }
    return (
        <div className={combinedClassNames}>
            {message}
        </div>
    )
}

export default Notification