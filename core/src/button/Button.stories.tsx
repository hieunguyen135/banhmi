// YourComponent.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Button, ButtonProps } from './button';
import { icons } from '../../../icon/src/index'

// This default export determines where your story goes in the story list
export default {
  title: 'Button',
  component: Button,
  argTypes: {
    style: {
      name: 'style',
      type: { name: 'object', required: true },
      defaultValue: JSON.stringify(Button.style.outset),
      control: {
        type: 'inline-radio',
        options: {
          outset: JSON.stringify(Button.style.outset),
          flat: JSON.stringify(Button.style.flat)
        },
      }
    },
    size: {
      name: 'size',
      type: { name: 'object', required: true },
      defaultValue: JSON.stringify(Button.size.medium),
      control: {
        type: 'inline-radio',
        options: {
          medium: JSON.stringify(Button.size.medium),
          small: JSON.stringify(Button.size.small)
        },
      }
    },
    highlight: {
      name: 'highlight',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    icon: {
      name: 'icon',
      type: { name: 'object', required: false },
      defaultValue: icons.blank,
      control: {
        type: 'select',
        options: icons
      }
    },
    disabled: {
      name: 'disable',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    selected: {
      name: 'selected',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    isFullWidth: {
      name: 'isFullWidth',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    isBusy: {
      name: 'isBusy',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    isReverse: {
      name: 'isReverse',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    }
  }
};

const Template: Story<ButtonProps> = (args) => {
  return (
    <>
      <Button { ...args } style={JSON.parse(args.style + '')} size={JSON.parse(args.size + '')}>{ args.children }</Button>
    </>
  )
};

export const Primary = Template.bind({});
Primary.args = {
  children: "This is button"
};
