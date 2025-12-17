/**
 * Define la estructura de respuesta estándar para todas las operaciones.
 * Es una unión discriminada para un manejo de tipos seguro.
 */
export type ServiceResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; data: T };

/**
 * Crea una respuesta de éxito estandarizada.
 * @param data - Los datos a devolver en caso de éxito.
 */
const createSuccessResponse = <T>(data: T): ServiceResponse<T> => ({
  success: true,
  data,
});

/**
 * Crea una respuesta de error estandarizada.
 * @param error - El mensaje de error.
 */
const createErrorResponse = <T = unknown>(
  error: string,
  data: T = false as unknown as T,
): ServiceResponse<T> => ({
  success: false,
  data,
  error,
});
function isSuccess<T>(
  result: ServiceResponse<T> | boolean,
): result is (ServiceResponse<T> & { success: true }) | true {
  if (typeof result === "boolean") {
    return result;
  }
  return result.success;
}
export { createSuccessResponse, createErrorResponse, isSuccess };
