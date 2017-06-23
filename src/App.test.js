import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
});

test('there is no I in team', () => {
   expect('team').not.toMatch(/I/);
   //TODO: case sensitivity?
});

test('but there is a "stop" in Christoph', () => {
   expect('Christoph').toMatch(/stop/);
});

//Testing Arrays
const friends = [
    "Gauri",
    "Troy",
    "Allison",
    "Reid",
    "Joe",
];

test('the friends has Allison in it', () => {
    expect(friends).toContain('Allison');
});



//Tests I could write for my form:
// TODO: Testing all of the regex: if put in an invalid input, check that it updates the state as such.
// TODO: Reloads on submit

it('snapshots the page correctly', () => {
    const component = renderer.create(<App/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});






