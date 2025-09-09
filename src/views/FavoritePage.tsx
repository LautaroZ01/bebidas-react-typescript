import { useMemo } from 'react'
import DrinkCart from '../components/DrinkCart'
import { useAppStore } from '../stores/useAppStore'

export default function FavoritePage() {
    const { favorites } = useAppStore()

    const hasFavorite = useMemo(() => favorites.length, [favorites])

    return (
        <>
            <h1 className='text-6xl font-extrabold '>Favoritos</h1>

            {hasFavorite ? (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10 ">
                    {favorites.map(drink => (
                        <DrinkCart
                            key={drink.idDrink}
                            drink={drink}
                        />
                    ))}
                </div>
            ) : (
                <p className='my-10 text-center text-2xl'>Los favoritos se mostraran aqui</p>
            )}
        </>
    )
}
