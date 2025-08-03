import ChapterField from "./ChapterField";

function ChapterContainer(props) {
    return (
        <div>
            {props.chapterData.map(data => (
                <ChapterField key={data.id} id={data.id} chapterName={data.chapterName}/>
            ))}
        </div>
    )
}

export default ChapterContainer