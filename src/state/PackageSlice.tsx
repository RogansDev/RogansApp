import { createSlice } from '@reduxjs/toolkit'

export const PackageSlice = createSlice({
    name: 'packages',
    initialState: {
        packages: []
    },
    reducers: {
        packagesSuccess: (state: any, action) => {
            state.services.push({
                id: action.payload.id,
                nombre: action.payload.nombre,
                precioViejo: action.payload.precioViejo,
                precioNuevo: action.payload.precioNuevo,
                descripcion: action.payload.descripcion,
                quees: action.payload.quees,
                productos: action.payload.productos,
                resultados: action.payload.resultados,
                youtubeUrl: action.payload.youtubeUrl,
                urlImagen: action.payload.urlImagen,
                sedeSeleccionada: action.payload.sedeSeleccionada
            });
        },
        packagesFailure: (state) => {
            return state
        },
        packagesClean: (state) => {
            state.packages = [];
        },
        packagesRemove: (state, action) => {
            const idToRemove = action.payload;
            state.packages = state.packages.filter((pack: any) => pack.id !== idToRemove);
        }
    },
});
export const { packagesSuccess, packagesFailure, packagesClean, packagesRemove } = PackageSlice.actions
export default PackageSlice.reducer;