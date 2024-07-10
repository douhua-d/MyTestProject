

// https://interview.poetries.top/docs/base/high-frequency.html#js%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2%E5%A6%82%E4%BD%95%E6%A3%80%E6%B5%8B-%E5%9C%BA%E6%99%AF%E6%9C%89%E5%93%AA%E4%BA%9B

/**
 * 有两种垃圾回收策略：
 *
 * 标记清除：标记阶段即为所有活动对象做上标记，清除阶段则把没有标记（也就是非活动对象）销毁。
 * 引用计数：它把对象是否不再需要简化定义为对象有没有其他对象引用到它。如果没有引用指向该对象（引用计数为 0），对象将被垃圾回收机制回收
 * 标记清除的缺点：
 *
 * 内存碎片化，空闲内存块是不连续的，容易出现很多空闲内存块，还可能会出现分配所需内存过大的对象时找不到合适的块。
 * 分配速度慢，因为即便是使用 First-fit 策略，其操作仍是一个 O(n) 的操作，最坏情况是每次都要遍历到最后，同时因为碎片化，大对象的分配效率会更慢。
 * 解决以上的缺点可以使用 标记整理（Mark-Compact）算法 标记结束后，标记整理算法会将活着的对象（即不需要清理的对象）向内存的一端移动，最后清理掉边界的内存（如下图）
 */

/**
 * 引用计数的缺点：
 *
 * 需要一个计数器，所占内存空间大，因为我们也不知道被引用数量的上限。
 * 解决不了循环引用导致的无法回收问题
 * IE 6、7，JS对象和DOM对象循环引用，清除不了，导致内存泄露
 * 
 * 🍑🍑🍑 V8 的垃圾回收机制也是基于标记清除算法，不过对其做了一些优化。
 *
 * 针对新生区采用并行回收。
 * 针对老生区采用增量标记与惰性回收
 */


// 拓展：WeakMap、WeakMap的作用
// 
// 作用是防止内存泄露的
// WeakMap、WeakMap的应用场景
// 想临时记录数据或关系
// 在vue3中大量使用了WeakMap
// WeakMap的key只能是对象，不能是基本类型



//标记清除（Mark-and-Sweep）是垃圾回收（Garbage Collection, GC）算法的一种常见实现方法，它通过标记活动对象并清除未标记的对象来管理内存。虽然标记清除算法在许多情况下是有效的，但它也有一些缺点和限制。以下是标记清除算法的主要缺点及其原因：
// 
// ## 标记清除算法的主要缺点
// 
// 1. **内存碎片化**
//    - **原因**：标记清除算法在清除未标记对象后，会留下内存碎片（即不连续的内存空闲块）。这些碎片会导致内存利用率下降，因为较大的对象可能无法找到足够连续的空间进行分配，即使总的空闲内存足够。
//    - **影响**：内存碎片化会导致内存分配失败，从而影响程序的稳定性和性能。特别是在长时间运行的程序中，这个问题可能会更加严重。
// 
// 2. **暂停时间长**
//    - **原因**：标记清除算法需要暂停应用程序的执行来标记活动对象和清除未使用的对象。这种暂停时间（也称为“停顿”）取决于堆的大小和对象的数量。
//    - **影响**：长时间的GC暂停会导致应用程序的响应时间变长，特别是对实时性要求较高的应用程序，这种延迟是不可接受的。
// 
// 3. **无法处理循环引用**
//    - **原因**：标记清除算法可以正确处理简单的引用计数问题，但对于复杂的对象图，例如循环引用（两个或多个对象相互引用），该算法需要额外的逻辑来正确识别和处理这些对象。
//    - **影响**：尽管标记清除算法本身可以处理循环引用，但在某些实现中，处理这些情况可能会增加算法的复杂性和开销。
// 
// 4. **额外的内存和计算开销**
//    - **原因**：标记清除算法需要额外的内存来存储标记位（通常是每个对象一个标记位），并且在标记阶段需要遍历所有活动对象，在清除阶段需要遍历整个堆。
//    - **影响**：这会增加内存和计算的开销，特别是在处理大对象图或大量小对象时，可能会对系统性能产生显著影响。
// 
// ## 为什么存在这些缺点？
// 
// 标记清除算法的这些缺点主要是由于其工作机制和设计决定的。以下是一些详细解释：
// 
// 1. **内存碎片化**：由于标记清除算法只负责标记和清除，而不做内存整理（如压缩），所以很容易在内存中留下不连续的空闲块。这些碎片化的问题需要其他技术（如标记整理或标记压缩）来解决。
// 
// 2. **暂停时间长**：标记和清除阶段都需要遍历整个对象图或整个堆，这导致了较长的暂停时间。现代垃圾回收器通常会使用增量式或并发标记清除来减少暂停时间，但这也会增加实现的复杂性。
// 
// 3. **循环引用处理复杂**：标记清除算法本身能够处理循环引用，但在实现上需要特别注意对象之间的复杂关系，这增加了算法的复杂性和执行时间。
// 
// 4. **额外的内存和计算开销**：每个对象一个标记位以及遍历整个对象图和堆的开销，是标记清除算法的固有特性。这些开销在处理大规模应用时，可能会对系统资源产生较大影响。
// 
// ## 解决方法
// 
// 为了解决标记清除算法的缺点，现代垃圾回收器通常结合多种技术，如：
// 
// - **分代收集**：将堆分为新生代和老年代，不同代采用不同的回收策略。
// - **标记压缩**：在标记和清除的基础上，进行内存整理，减少碎片化。
// - **增量和并发GC**：将GC过程分为多个小步骤，减少每次GC的暂停时间。
// 
// 这些改进使得垃圾回收器能够更高效地管理内存，同时减少对应用程序性能的影响。