function ChapterField(props) {
    return (
        <div>
            <label htmlFor={'chapterFormat' + props.id}>Chapter file name:</label>
            <input id={'chapterFormat' + props.id} type="text" defaultValue={props.chapterName}></input>
        </div>
    )
}

export default ChapterField