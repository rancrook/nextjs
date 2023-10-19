import data from '../utils/pokedex';
import React, { useEffect, useState } from 'react';

function Filter({ info, setFilter, removeFilter }) {
  const handleSelectAttr = (e) => {
    const value = e.target.value;

    setFilter(
      Object.assign(info, {
        attr: value,
        comp: value === 'type' ? '' : info.comp,
        val: info.attr === 'type' || value === 'type' ? '' : info.val
      })
    )
  };

  const handleSelectType = (e) => {
    setFilter(Object.assign(info, { val: e.target.value }));
  };

  const handleSelectComp = (e) => {
    setFilter(Object.assign(info, { comp: e.target.value }));
  };

  const handleChangeStat = (e) => {
    setFilter(Object.assign(info, { val: parseInt(e.target.value) }));
  }

  return (
    <div key={info.id} style={{ display: 'flex', flexDirection: 'row' }}>
      <select defaultValue={info.attr} onChange={handleSelectAttr}>
        <option />
        <option value='type'>Type</option>
        <option value='hp'>HP</option>
        <option value='atk'>Atk</option>
        <option value='def'>Def</option>
        <option value='spa'>SpA</option>
        <option value='spd'>SpD</option>
        <option value='spe'>Spe</option>
      </select>
      {info.attr === 'type' && (
        <>
          {'='}
          <select defaultValue={info.val} onChange={handleSelectType}>
            <option />
            <option>Normal</option>
            <option>Fighting</option>
            <option>Flying</option>
            <option>Poison</option>
            <option>Ground</option>
            <option>Rock</option>
            <option>Bug</option>
            <option>Ghost</option>
            <option>Steel</option>
            <option>Fire</option>
            <option>Water</option>
            <option>Grass</option>
            <option>Electric</option>
            <option>Psychic</option>
            <option>Ice</option>
            <option>Dragon</option>
            <option>Dark</option>
            <option>Fairy</option>
          </select>
        </>
      )}
      {info.attr !== '' && info.attr !== 'type' && (
        <select defaultValue={info.comp} onChange={handleSelectComp}>
          <option />
          <option>{'='}</option>
          <option>{'>'}</option>
          <option>{'<'}</option>
          <option>{'>='}</option>
          <option>{'<='}</option>
        </select>
      )}
      {info.comp !== '' && (
        <input value={info.val} type='number' onChange={handleChangeStat}/>
      )}
      <button onClick={() => removeFilter(info.id)}>×</button>
    </div>
  )
}

function Row({ info }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '4rem'
    }}>
      <span style={{ width: '3rem' }}>
        #{info.num}
      </span>
      <span style={{ width: '12rem' }}>
        {info.name}
      </span>
      <span style={{
        display: 'flex',
        flexDirection: 'column',
        width: '4rem'
      }}>
        <span>{info.types[0]}</span>
        <span>{info.types[1]}</span>
      </span>
      <span style={{
        display: 'flex',
        flexDirection: 'column',
        width: '10rem'
      }}>
        <span>{info.abilities[0]}</span>
        <span>{info.abilities[1]}</span>
        <span>{info.abilities.H}</span>
      </span>
      <span style={{ width: '2rem' }}>
        {info.baseStats.hp}
      </span>
      <span style={{ width: '2rem' }}>
        {info.baseStats.atk}
      </span>
      <span style={{ width: '2rem' }}>
        {info.baseStats.def}
      </span>
      <span style={{ width: '2rem' }}>
        {info.baseStats.spa}
      </span>
      <span style={{ width: '2rem' }}>
        {info.baseStats.spd}
      </span>
      <span style={{ width: '2rem' }}>
        {info.baseStats.spe}
      </span>
    </div>
  );
}

export default function Pokedex() {
  const all = Object.values(data);
  const [list, setList] = useState(all);
  const [filters, setFilters] = useState([]);
  const [query, setQuery] = useState('');
  const [pokemon, setPokemon] = useState(all);

  useEffect(() => {
    search({ target: { value: query }});
  }, [list]);

  const addFilter = () => {
    const last = filters[filters.length - 1];

    setFilters(filters.concat({
      id: (last?.id || 0) + 1,
      attr: '',
      comp: '',
      val: ''
    }));
  };

  const setFilter = (info) => {
    let newFilters = [...filters];
    newFilters[filters.indexOf(info.id)] = info;

    setFilters(newFilters);
  };

  const removeFilter = (id) => {
    setFilters(filters.filter((el) => el.id !== id));
  };

  const search = (e) => {
    const value = e.target.value;

    setQuery(value);

    setPokemon(
      list.filter((el) => (
        el.name.toLowerCase().startsWith(value.toLowerCase())
      ))
    );
  };

  const applyFilters = () => {
    let filteredList = [...all];

    filters.forEach((filter) => {
      filteredList = filteredList.filter((pokemon) => {
        if (filter.val !== '') {
          if (filter.attr === 'type') {
            return pokemon.types.includes(filter.val);
          }

          if (filter.comp === '=') {
            return pokemon.baseStats[filter.attr] === filter.val;
          }

          if (filter.comp === '>') {
            return pokemon.baseStats[filter.attr] > filter.val;
          }

          if (filter.comp === '<') {
            return pokemon.baseStats[filter.attr] < filter.val;
          }

          if (filter.comp === '>=') {
            return pokemon.baseStats[filter.attr] >= filter.val;
          }

          if (filter.comp === '<=') {
            return pokemon.baseStats[filter.attr] <= filter.val;
          }
        }

        return true;
      })
    });

    setList(filteredList);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input style={{ width: '10rem' }} type='text' value={query} onChange={search} />
        {filters.map((el) => (
          <Filter
            info={el}
            setFilter={setFilter}
            removeFilter={removeFilter}
          />
        ))}
        <button onClick={addFilter} style={{ width: '2rem' }}>+</button>
        <button onClick={applyFilters} style={{ width: '10rem' }}>Apply Filters</button>
      </div>
      <div>
        {pokemon.map((el) => <Row info={el} />)}
      </div>
    </div>
  );
}
