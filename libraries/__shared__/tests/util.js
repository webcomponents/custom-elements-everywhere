export const getProp = async (ce, name) => {
  return await (await (await ce.elementHandle()).getProperty(name)).jsonValue()
}

export const getPropOrAttr = async (ce, name) => {
  return await getProp(ce, name) ?? ce.getAttribute(name);
}

export const weight = (weight) => ({
  annotation: {type: 'weight', description: weight}
})
