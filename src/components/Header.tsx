import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
    const [searchFilter, setSearchFilter] = useState({
        ingredient: '',
        category: ''
    })
    const { pathname } = useLocation()

    const isHome = useMemo(() => pathname === '/', [pathname])

    const { categories, fetchCategories, searchRecipes, showNotification } = useAppStore()

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilter({
            ...searchFilter,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validar
        if (Object.values(searchFilter).includes('')) {
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        // Consultar las recetas
        searchRecipes(searchFilter)
    }

    return (
        <header className={isHome ? "bg-header bg-center bg-cover" : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="Logo" />
                    </div>
                    <nav className="flex gap-4 items-center">
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase' : 'text-white uppercase'
                            }
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            to='/favoritos'
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase' : 'text-white uppercase'
                            }
                        >
                            Favoritos
                        </NavLink>
                        <NavLink
                            to='/generate-ai'
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase' : 'text-white uppercase'
                            }
                        >
                            Generar con IA
                        </NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form onSubmit={handleSubmit} className="md:w-1/2 2xl:1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6">
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Nombre o Ingrediente
                            </label>

                            <input
                                type="text"
                                id="ingredient"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o ingrediente. Ej. Vodka, Tequila, Coffe"
                                onChange={handleChange}
                                value={searchFilter.ingredient}
                            />

                        </div>
                        <div className="space-y-4">
                            <label
                                htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"

                            >
                                Categoria
                            </label>

                            <select
                                name="category"
                                id="category"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                onChange={handleChange}
                                value={searchFilter.category}
                            >
                                <option value="">-- Seleccione --</option>
                                {categories.drinks.map((category, index) => (
                                    <option
                                        key={index}
                                        value={category.strCategory}
                                    >
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="submit"
                                value='Buscar receta'
                                className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold p-2 rounded-lg uppercase w-full"
                            />

                        </div>
                    </form>
                )}
            </div>
        </header>
    )
}
