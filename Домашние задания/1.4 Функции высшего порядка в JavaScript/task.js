//Задача № 1
function cachingDecoratorNew(func) {
  let hashes = {};
  return function (...params) {
    let hash = md5(params.join(','));
    if (!(hash in hashes)) {
      if (Object.keys(hashes).length === 5) {
        delete hashes[Object.keys(hashes)[0]];
      }
      hashes[hash] = func(...params);
      return `Вычисляем: ${hashes[hash]}`;
    }
    return `Из кеша: ${hashes[hash]}`;
  }
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timerId;

  function wrapper(...params) {
    wrapper.allCount += 1;

    const execute = () => {
      func(...params);
      wrapper.count += 1;
      timerId = setTimeout(() => timerId = null, delay); 
    }

    if (timerId) {
      clearTimeout(timerId);
      timerId = setTimeout(() => execute(), delay);
      return;
    }

    execute();
  }

  wrapper.count = 0;
  wrapper.allCount = 0;
  return wrapper;
}
