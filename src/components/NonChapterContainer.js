import NonChapterField from "./NonChapterField";

function NonChapterContainer(props) {
    return (
        <div>
            {props.nonChapterData.map(data => (
                <NonChapterField key={data.id} id={data.id} nonChapterName={data.format} descriptor={data.descriptor} checked={data.isBeforeChapters}/>
            ))}
        </div>
    )
}

export default NonChapterContainer