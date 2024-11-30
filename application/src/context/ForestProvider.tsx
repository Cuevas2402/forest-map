import useSWR from 'swr';
import useClient from "@/hooks/useClient";
import { ForestProviderProps, TreesDist, TypesDist } from "@/interfaces/props";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from '@/components/Spinner';
import Forest from '@/interfaces/forest';

const ForestContext = createContext<any>(undefined);

const ForestProvider: React.FC<ForestProviderProps> = ({ children }) => {

	const [forest, setForest] = useState<Forest[]>([]);
	const [classes, setClasses] = useState<TreesDist[][]>([]);
	const [types, setTypes] = useState<TypesDist[][]>([]);
	const [healthData, setHealthData] = useState<any>(null);
	const [classesData, setClassesData] = useState<any>(null);
	const [typesData, setTypesData] = useState<any>(null);

	const [coordenates, setCoordenates] = useState<any>(null);


	const { id } = useParams<{ id: string }>();
	const client = useClient();

	

	const fetcher = async (url: string, Fid: number) => {
		const response = await client.post(url, { Fid });
		setForest([response.data.forest]);
		setClasses(response.data.classes);
		setTypes(response.data.types);

		return response.data;
	};

	const { data , error, isLoading } = useSWR(
		['/forest/info', parseInt(id || '3')],
		([url, Fid]) => fetcher(url, Fid)
	);

	useEffect(() => {
		if (forest.length > 0) {
			const { Latitud, Longitud } = forest[0];
			setCoordenates({ x: parseFloat(Latitud), y: parseFloat(Longitud) });
		}
	}, [forest]);


	useEffect(() => {

        if (classes.length > 0) {

            const total = classes[0].reduce((acc: number, classItem : TreesDist) => acc + classItem.total, 0);

			const sub = classes[0].reduce((acc: number, curr : TreesDist) => {
				if([1,2,3].includes(curr._id)){
					return acc + curr.total
				}
				return acc
			},0)

			setHealthData([{ category: "forest", heatlh: (sub/total * 100).toFixed(0), fill: "var(--color-forest)" }])

			const keys : string[] = ["healthy", "light", "moderate", "several", "death"]

			setClassesData(classes[0].map((clss) => {

				return { category: keys[clss._id -1 ], class: clss.total, fill:`var(--color-${keys[clss._id-1]})`}

			}))

        }
    }, [classes]);

	useEffect(()=> {
		if(types.length > 0){

			setTypesData(types[0].map((ty) => {
				return   { species: ty._id , total: ty.total }
			}))

		}
	},[types])


	if (data) {}

	if (error) return <div>Error al cargar los datos</div>;

	if (isLoading) return <Spinner />;






	return (
		<ForestContext.Provider value={{ forest, classes, types, healthData, classesData, typesData, coordenates}}>
			{children}
		</ForestContext.Provider>
	);
};

export { ForestProvider };
export default ForestContext;
