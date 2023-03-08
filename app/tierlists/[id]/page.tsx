
type PropsParams = {
    params: {
        id: string
    }
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}
export default function BoardPage({params, searchParams}: PropsParams) {
    return (
        <>
            <h1>{params.id}</h1>
            <h2>{searchParams?.name}</h2>
        </>
    )
}
