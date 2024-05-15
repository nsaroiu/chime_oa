import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

type DataItem = {
    name?: string;
    title?: string;
    firstname?: string;
    lastname?: string;
    avatar?: string;
}

type OptionType = {
    label: string;
    data: DataItem;
}

// const url = "/api/front-end-task/";
const url = "/api/front-end-task/";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState<DataItem | null>(null);
    const [options, setOptions] = useState<OptionType[]>([]);

    useEffect(() => {
        axios.get(url + "front-end-task.json")
            .then(response => {
                const formattedOptions = response.data.map((item: DataItem) => ({
                    label: normalizeOption(item),
                    data: item
                }));
                setOptions(formattedOptions);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    // Normalize the data to a string
    const normalizeOption = (item: DataItem): string => {
        if (item.name) {
            return item.name;
        } else if (item.title) {
            return item.title;
        } else if (item.firstname && item.lastname) {
            return `${item.firstname} ${item.lastname}`;
        } 
        return "Unknown";
    };

    return (
    <>
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label}
            onChange={(_, value) => {
                setSearchTerm(null);    
                setSearchTerm(value ? value.data : null);
            }}
            forcePopupIcon={false}
            renderInput={(params) => <TextField {...params}/>}
        />

        {searchTerm && (
            <div>
                <h2>{normalizeOption(searchTerm)}</h2>
                {searchTerm.avatar ? <img style={{ 'width': '50%', 'display': 'block', 'margin': 'auto' }} src={url + searchTerm.avatar} /> : null}
                <p>{JSON.stringify(searchTerm, null, 2)}</p>
            </div>
        
        )}
    </>
    );
    
}

export default SearchBar;
