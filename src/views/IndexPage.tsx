import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCart from "../components/DrinkCart"

export default function IndexPage() {
    const { drinks } = useAppStore()
    const hasDrinks = useMemo(() => drinks.drinks.length, [drinks])

    return (
        <>
            <h1 className="text-6xl font-extrabold">Rectas</h1>

            {hasDrinks ? (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10 ">
                    {drinks.drinks.map(drink => (
                        <DrinkCart
                            key={drink.idDrink}
                            drink={drink}
                        />
                    ))}
                </div>
            ) : (
                <p className="my-10 text-center text-2xl">No hay resultados aun, utiliza el formulario para buscar recetas</p>
            )}
        </>
    )
}
