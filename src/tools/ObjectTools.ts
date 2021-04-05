/**
 * [ObjectTools] - tool class for copy and chunk object or array
 */
export default class ObjectTools {

    /**
     * Copy method
     *
     * @param object
     * @return same object, but without links
     */
    static copy(object: any): any {
        try {
            return JSON.parse(JSON.stringify(object))
        } catch (e) {
            return {}
        }
    }

    /**
     * Chunk method
     *
     * @param input
     * @param chunkSize
     * @return 2 dimensional array, with [chunkSize] size or less.
     */
    static chunk(input: any[], chunkSize: number): any[][] {
        let i, j;
        let temp: any[]

        const result: any[] = []
        
        for (i = 0, j = input.length; i < j; i += chunkSize) {
            temp = input.slice(i, i + chunkSize);
            
            result.push(temp)
        }
        
        return result
    }
}