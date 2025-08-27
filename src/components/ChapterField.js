function ChapterField(props) {
    return (
        <div className='chapterField'>
            <label htmlFor={'chapterFormat' + props.id}>Chapter file name:</label>
            <input id={'chapterFormat' + props.id} className='chapterFormat' type='text' defaultValue={props.chapterName}></input>
        </div>
    )
}

export default ChapterField