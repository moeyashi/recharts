import { render } from '@testing-library/react';
import React from 'react';
import { DefaultTooltipContent } from '../../src/component/DefaultTooltipContent';

describe('<DefaultTooltipContent />', () => {
  const defaultPayload = { value: 10, name: 'A', unit: '%' };

  test('Render string label', () => {
    const { container } = render(<DefaultTooltipContent label="this is label" />);
    expect(container.getElementsByClassName('recharts-tooltip-label')[0].textContent).toEqual('this is label');
  });

  test('Render element label', () => {
    const { container } = render(
      <DefaultTooltipContent label={<span className="tooltip-label-element">element label</span>} />,
    );
    expect(container.getElementsByClassName('tooltip-label-element')[0].textContent).toEqual('element label');
  });

  test('Render formatted label', () => {
    const { container } = render(
      <DefaultTooltipContent
        label="this is label"
        labelFormatter={() => 'this is formatted label'}
        payload={[defaultPayload]}
      />,
    );
    expect(container.getElementsByClassName('recharts-tooltip-label')[0].textContent).toEqual(
      'this is formatted label',
    );
  });

  test('Render value', () => {
    const { container } = render(<DefaultTooltipContent payload={[defaultPayload]} />);
    expect(container.getElementsByClassName('recharts-tooltip-item-value')[0].textContent).toEqual('10');
  });

  test('Render name', () => {
    const { container } = render(<DefaultTooltipContent payload={[defaultPayload]} />);
    expect(container.getElementsByClassName('recharts-tooltip-item-name')[0].textContent).toEqual('A');
  });

  test("Don't render name", () => {
    const { container } = render(<DefaultTooltipContent payload={[{ ...defaultPayload, name: undefined }]} />);
    expect(container.getElementsByClassName('recharts-tooltip-item-name').length).toEqual(0);
  });

  test('Render default separator', () => {
    const { container } = render(<DefaultTooltipContent payload={[defaultPayload]} />);
    expect(container.getElementsByClassName('recharts-tooltip-item-separator')[0].textContent).toEqual(' : ');
  });

  test("Don't render separator", () => {
    const { container } = render(<DefaultTooltipContent payload={[{ ...defaultPayload, name: undefined }]} />);
    expect(container.getElementsByClassName('recharts-tooltip-item-separator').length).toEqual(0);
  });

  test('Render unit', () => {
    const { container } = render(<DefaultTooltipContent payload={[defaultPayload]} />);
    expect(container.getElementsByClassName('recharts-tooltip-item-unit')[0].textContent).toEqual('%');
  });

  test('Render empty unit', () => {
    const { container } = render(<DefaultTooltipContent payload={[{ ...defaultPayload, unit: undefined }]} />);
    expect(container.getElementsByClassName('recharts-tooltip-item-unit')[0].textContent).toEqual('');
  });

  test("Don't render unit when hideUnit is true", () => {
    const { container } = render(<DefaultTooltipContent payload={[{ ...defaultPayload, hideUnit: true }]} />);
    expect(container.getElementsByClassName('recharts-tooltip-item-unit').length).toEqual(0);
  });

  test('Render null when entry type is none', () => {
    const { container } = render(<DefaultTooltipContent payload={[{ ...defaultPayload, type: 'none' }]} />);
    expect(container.getElementsByClassName('recharts-tooltip-item-list')[0].children.length).toEqual(0);
  });

  test('Render overridden name when formatter returns array', () => {
    const { container } = render(
      <DefaultTooltipContent payload={[{ ...defaultPayload, formatter: () => [10, 'B'] }]} />,
    );
    expect(container.getElementsByClassName('recharts-tooltip-item-name')[0].textContent).toEqual('B');
  });

  test('Render 2 items', () => {
    const { container } = render(
      <DefaultTooltipContent payload={[{ ...defaultPayload, value: 20 }, defaultPayload]} />,
    );
    const values = container.getElementsByClassName('recharts-tooltip-item-value');
    expect(values[0].textContent).toEqual('20');
    expect(values[1].textContent).toEqual('10');
  });

  test('Render sorted items', () => {
    const { container } = render(
      <DefaultTooltipContent
        payload={[{ ...defaultPayload, value: 20 }, defaultPayload]}
        itemSorter={({ value }) => value || 0}
      />,
    );
    const values = container.getElementsByClassName('recharts-tooltip-item-value');
    expect(values[0].textContent).toEqual('10');
    expect(values[1].textContent).toEqual('20');
  });

  describe('defaultFormatter', () => {
    test('Render joined value when value is array', () => {
      const { container } = render(<DefaultTooltipContent payload={[{ ...defaultPayload, value: [10, 20] }]} />);
      expect(container.getElementsByClassName('recharts-tooltip-item-value')[0].textContent).toEqual('10 ~ 20');
    });
  });
});
