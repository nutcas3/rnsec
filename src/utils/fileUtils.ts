import { readFile } from 'fs/promises';
import { resolve } from 'path';
import type { RnsecConfig } from '../types/ruleTypes.js';

export async function readFileContent(filePath: string): Promise<string> {
  try {
    const content = await readFile(resolve(filePath), 'utf-8');
    return content;
  } catch (error) {
    throw new Error(`Failed to read file ${filePath}: ${error}`);
  }
}

export async function readRnsecConfig(rootDir: string): Promise<RnsecConfig | null> {
  const configPaths = ['.rnsec.json', '.rnsec.jsonc', '.rnsec.config.json'];

  for (const configPath of configPaths) {
    try {
      const fullPath = resolve(rootDir, configPath);
      const content = await readFile(fullPath, 'utf-8');
      const config = JSON.parse(content);
      return config as RnsecConfig;
    } catch (error) {
      // Continue to next config file
    }
  }

  return null;
}

export function getFileExtension(filePath: string): string {
  const lastDot = filePath.lastIndexOf('.');
  return lastDot === -1 ? '' : filePath.slice(lastDot);
}

export function isJavaScriptFile(filePath: string): boolean {
  const ext = getFileExtension(filePath);
  return ['.js', '.jsx', '.ts', '.tsx'].includes(ext);
}

export function isJsonFile(filePath: string): boolean {
  return getFileExtension(filePath) === '.json';
}

export function isXmlFile(filePath: string): boolean {
  return getFileExtension(filePath) === '.xml';
}

export function isPlistFile(filePath: string): boolean {
  return getFileExtension(filePath) === '.plist';
}

