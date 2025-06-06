// Copyright (C) 2023-2024 StorSwift Inc.
// This file is part of the PowerVoting library.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at:
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { filecoin, filecoinCalibration } from 'wagmi/chains';
import {
  oracleCalibrationContractAddress,
  oracleMainNetContractAddress,
  oraclePowerCalibrationContractAddress,
  powerVotingCalibrationContractAddress,
  powerVotingMainNetContractAddress,
  powerVotingFipMainNetContractAddress,
  powerVotingFipCalibrationContractAddress
} from "../common/consts";
export const stringToBase64Url = (str: string) => {
  const base64 = btoa(str);

  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export const bigNumberToFloat = (value: number | string, decimals: number = 18) => {
  return Number(value) ? (Number(value) / (10 ** decimals)).toFixed(2) : '0';
}

/**
 * Convert value to Byte String
 * @param bytes
 */
export const convertBytes = (bytes: number | string) => {
  // Define an array of unit strings representing different byte units
  const units = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  // Initialize the unit index to 0
  let unitIndex = 0;
  // Convert input bytes to a number
  let remainder = Number(bytes);

  // Loop until the remainder is greater than or equal to 1024 and the unit index is within range
  while (remainder >= 1024 && unitIndex < units.length - 1) {
    // Divide the remainder by 1024 to convert to the next unit
    remainder /= 1024;
    unitIndex++;
  }

  // Return a string representing the converted bytes with appropriate unit
  // If remainder is truthy (i.e., not zero), return the formatted string; otherwise, return '0'
  return remainder ? `${remainder.toFixed(2)} ${units[unitIndex]}` : '0';
}

/**
 * Check duplicate value
 * @param array
 */
export const hasDuplicates = (array: string[]) => {
  return new Set(array).size !== array.length;
}

export const markdownToText = (markdownString: string) => {
  // Remove links ([...](...))
  const noLinks = markdownString.replace(/\[(.+?)\]\(.+?\)/g, '$1');

  // Remove images (![...](...))
  const noImages = noLinks.replace(/!\[(.+?)\]\(.+?\)/g, '$1');

  // Remove inline code blocks（`...`）
  const noInlineCode = noImages.replace(/`([^`]+)`/g, '$1');

  // Remove bold (**...** or __...__)
  const noBold = noInlineCode.replace(/(?:\*{2}|_{2})(.*?)(?:\*{2}|_{2})/g, '$1');

  // Remove italic (*...* or _..._)
  const noItalic = noBold.replace(/(?:\*|_)(.*?)(?:\*|_)/g, '$1');

  // Remove headings (#...，##...，###..., etc.)
  const noHeadings = noItalic.replace(/^#+\s*(.*?)\s*#*$/gm, '$1');

  // Remove unordered lists（-... or *...）
  const noUnorderedList = noHeadings.replace(/^[\s]*[-*][\s]+(.*?)[\s]*$/gm, '$1');

  // Remove ordered lists（1. ...）
  const noOrderedList = noUnorderedList.replace(/^[\s]*\d+\.[\s]+(.*?)[\s]*$/gm, '$1');

  // Remove strikethrough (~~...~~)
  const noStrikethrough = noOrderedList.replace(/~~(.*?)~~/g, '$1');

  // Remove blockquotes（> ...）
  const noBlockquote = noStrikethrough.replace(/^\s*>\s*(.*?)[\s]*$/gm, '$1');

  // Remove horizontal rules（---）
  const noHorizontalRule = noBlockquote.replace(/^[\s]*[-*_][\s]*[-*_][\s]*[-*_][\s]*$/gm, '');

  // Remove HTML comments rules（<!--...-->）
  const noHTMLComments = noHorizontalRule.replace(/<!--[\s\S]*?-->/g, '');

  // Remove HTML anchor rules（(#...)）
  const noHTMLAnchor = noHTMLComments.replace(/\(#([^)]+)\)/g, '');

  // Remove blank lines
  const finalString = noHTMLAnchor.replace(/^\s*[\r\n]/gm, '');

  return finalString;
}

/**
 * Check whether value isn't empty
 * @param value
 */
export const validateValue = (value: string) => {
  return value?.trim() !== '';
};


const contractAddresses: any = {
  powerVoting: {
    [filecoin.id]: powerVotingMainNetContractAddress,
    [filecoinCalibration.id]: powerVotingCalibrationContractAddress,
  },
  oracle: {
    [filecoin.id]: oracleMainNetContractAddress,
    [filecoinCalibration.id]: oracleCalibrationContractAddress,
  },
  oraclePower: {
    [filecoin.id]: oraclePowerCalibrationContractAddress,
    [filecoinCalibration.id]: oraclePowerCalibrationContractAddress,
  },
  powerVotingFip: {
    [filecoin.id]: powerVotingFipMainNetContractAddress,
    [filecoinCalibration.id]: powerVotingFipCalibrationContractAddress,
  },
};

/**
 * Get smart contract address
 * @param chainId
 * @param type
 */
export const getContractAddress = (chainId: number, type: string) => {
  const chainContracts = contractAddresses[type] || {};
  return chainContracts[chainId];
};


// Converts hexadecimal to a string
export const hexToString = (hex: any) => {
  if (!hex) {
    return '';
  }
  let str = '';
  if (hex.substring(1, 3) === '0x') {
    str = hex.substring(3)
  } else {
    str = hex;
  }
  // Split a hexadecimal string by two characters
  const pairs = str.match(/[\dA-Fa-f]{2}/g);
  if (pairs == null) {
    return '';
  }
  // Converts split hexadecimal numbers to characters and concatenates them
  return pairs.map((pair: any) => String.fromCharCode(parseInt(pair, 16))).join('').replace(/[^\x20-\x7E]/g, '').trim();
}

const gcd = (a: number, b: number) => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

export const simplifyFraction = (numerator: number, denominator: number) => {
  if (numerator === 0) return '0';

  const gcdValue = gcd(numerator, denominator);

  const simplifiedNumerator = numerator / gcdValue;
  const simplifiedDenominator = denominator / gcdValue;

  if (simplifiedDenominator === 1) {
    return `${simplifiedNumerator}`;
  }

  return `${simplifiedNumerator}/${simplifiedDenominator}`;
}





