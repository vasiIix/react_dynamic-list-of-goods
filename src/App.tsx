import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';

// import { getAll, get5First, getRed } from './api/goods';
// or
import * as goodsAPI from './api/goods';
import { Good } from './types/Good';

export const App: React.FC = () => {
  enum GoodSortType {
    all = 'all',
    firsFive = 'firsFive',
    redColor = 'redColor',
  }

  const [sotedType, setSortedType] = useState<GoodSortType>(GoodSortType.all);
  const [goods, setGoods] = useState<Good[] | null>(null);

  useEffect(() => {
    switch (sotedType) {
      case GoodSortType.all:
        goodsAPI.getAll().then(newGoods => setGoods(newGoods));
        break;
      case GoodSortType.firsFive:
        goodsAPI.get5First().then(newGoods => setGoods(newGoods));
        break;
      case GoodSortType.redColor:
        goodsAPI.getRedGoods().then(newGoods => setGoods(newGoods));
        break;
    }
  }, [sotedType]);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button
        type="button"
        data-cy="all-button"
        onClick={() => setSortedType(GoodSortType.all)}
      >
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={() => setSortedType(GoodSortType.firsFive)}
      >
        Load 5 first goods
      </button>

      <button
        type="button"
        data-cy="red-button"
        onClick={() => setSortedType(GoodSortType.redColor)}
      >
        Load red goods
      </button>

      {goods && <GoodsList goods={goods} />}
    </div>
  );
};
