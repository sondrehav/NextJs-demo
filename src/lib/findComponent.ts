import {Component, ComponentContent, ComponentType, Maybe} from "types/catalogue";

const findComponent = <T extends ComponentContent>(components: Component[], type: ComponentType, id?: string): Maybe<T> => {
  return (components.find(s => s.type === type && !!s.content && (!id || s.id === id))?.content ?? null) as Maybe<T>;
};

export default findComponent;