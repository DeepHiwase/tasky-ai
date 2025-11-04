/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Google AI module for the app
 */

// Node Modules
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const models = genAI.models;

export default models;
