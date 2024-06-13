export default function Card({ judul, sponsor }) {
    return (
        <>
                <h1 className="text-white">{judul}</h1>
                <p className="text-white">{sponsor}</p>
        </>
    )
}
