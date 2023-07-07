import { useEffect, useState } from "react";
import axios from 'axios'
import { CardCharacter } from "../CardCharacter";
import IconLoader from "../../assets/loader.gif"
import { ContainerApp, HeaderApp, ContentCharacters, Loader } from "./styles";


export function Application() {
    const [characters, setCharacters] = useState([])
    const [page, setPage] = useState(1)
    const [countPages, setCountPages] = useState('')
    const [qtdCharacters, setQtdCharacters] = useState('')
    const [isLoader, setIsLoader] = useState(true)

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
            .then(response => {
                //console.log(response.data.info.count);
                const array = [...characters, ...response.data.results]
                setCharacters(array)
                setCountPages(response.data.info.pages)
                setQtdCharacters(response.data.info.count)
                setIsLoader(false)

            })
    }, [page])

    return (
        <>
            {
                isLoader && (
                    <Loader>
                        <img src={IconLoader} alt="" />
                    </Loader>
                )
            }

            <ContainerApp>
                <HeaderApp>
                    <h1>Ricky and Morty</h1>
                    <span>Nº de Personagens: {qtdCharacters}</span>
                </HeaderApp>

                <ContentCharacters>
                    <div>
                        {
                            characters && characters.map(({ image, name, species, gender }) => {
                                return (
                                    <CardCharacter
                                        image={image}
                                        name={name}
                                        genre={species}
                                        specie={gender}
                                    />
                                )
                            })
                        }

                    </div>
                    {
                        (!(page === countPages)) && <button onClick={() => setPage(page + 1)}>Carregar mais</button>
                    }


                </ContentCharacters>
            </ContainerApp>
        </>
    )
}